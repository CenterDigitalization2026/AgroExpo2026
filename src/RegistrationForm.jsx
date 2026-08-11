import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLanguage } from "./i18n/LanguageContext";
import emailjs from "@emailjs/browser";
import "./RegistrationForm.css";

const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfuM_HCt97JAN1tg-JuvSoGN4w9DtlXydSKFcJ1Qx7_Hm-T1g/formResponse";

// Конфигурация EmailJS для авто-отправки подтверждающего письма на email
const EMAILJS_SERVICE_ID = "service_1ctngd8";
const EMAILJS_TEMPLATE_ID = "template_67a2psq";
const EMAILJS_PUBLIC_KEY = "O5XmaJPSPgFBquV79pW5r";

const sendEmailNotification = async (sanitized) => {
  if (
    !EMAILJS_SERVICE_ID ||
    EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
    !EMAILJS_PUBLIC_KEY ||
    EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
  ) {
    console.info(
      "EmailJS не настроен (укажите SERVICE_ID, TEMPLATE_ID и PUBLIC_KEY в RegistrationForm.jsx)",
    );
    return;
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: sanitized.fullName,
        to_email: sanitized.email,
        phone: sanitized.phone,
        organization: sanitized.organization,
        position: sanitized.position,
        region: sanitized.region,
        category: sanitized.category,
        format: sanitized.format,
      },
      EMAILJS_PUBLIC_KEY
    );
    console.log("EmailJS SUCCESS!", response.status, response.text);
  } catch (err) {
    console.error("Ошибка отправки письма через EmailJS:", err);
  }
};

const ENTRY_MAP = {
  fullName: "entry.1118557367",
  email: "entry.1520353905",
  phone: "entry.993995540",
  organization: "entry.1316552799",
  position: "entry.413589800",
  region: "entry.768601955",
  category: "entry.820850013",
  format: "entry.1009362225",
};

export const REGION_OPTIONS = [
  "г. Душанбе",
  "Согдийская область",
  "Хатлонская область",
  "Горно-Бадахшанская автономная область (ГБАО)",
  "Районы республиканского подчинения (РРП)",
  "Зарубежный участник / Международный делегат",
];

export const CATEGORY_OPTIONS = [
  "Государственный сектор (Министерства, ведомства)",
  "Дехканское хозяйство / Фермер / Агрохолдинг / Кооператив",
  "IT-компания / Разработчик AgTech / Поставщик оборудования",
  "Международная организация / Донорская структура / НПО",
  "Финансовый институт / Банк / МФО / Страховая компания",
  "Научно-исследовательский институт / ВУЗ / Преподаватель / Студент",
  "Маркетплейс / Логистическая компания / Переработчик",
  "СМИ / Пресса",
];

export const FORMAT_OPTIONS = [
  "Посетитель выставки (Expo) — свободный осмотр демо-зон и стендов",
  "Делегат конференции (Forum) — участие в сессиях",
  "Участник со стендом (Экспонент) — демонстрация решений",
  "Спикер / Докладчик — выступление на сессии",
  "Студент-гид / Волонтер — сопровождение техно-туров",
];

const FIO_REGEX = /^[a-zA-Zа-яА-ЯёЁҒғӢӣҚқӮӯҲҳҶҷ\s-]+$/;
const TAJIKISTAN_PHONE_REGEX = /^\+992\d{9}$/;

export const sanitizeValues = (values) => {
  let cleanedPhone = (values.phone || "").trim().replace(/[^\d+]/g, "");
  if (cleanedPhone.startsWith("992") && !cleanedPhone.startsWith("+992")) {
    cleanedPhone = "+" + cleanedPhone;
  } else if (/^\d{9}$/.test(cleanedPhone)) {
    cleanedPhone = "+992" + cleanedPhone;
  }

  return {
    ...values,
    fullName: (values.fullName || "").trim().replace(/\s+/g, " "),
    email: (values.email || "").trim().toLowerCase(),
    phone: cleanedPhone,
    organization: (values.organization || "").trim().replace(/\s+/g, " "),
    position: (values.position || "").trim().replace(/\s+/g, " "),
  };
};

export const RegistrationForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = useMemo(() => {
    const val = t.registration.validation;
    return Yup.object().shape({
      fullName: Yup.string()
        .trim()
        .required(val.fullNameRequired)
        .min(5, val.fullNameMin)
        .max(100, val.fullNameMax)
        .matches(FIO_REGEX, val.fullNameMatch),
      email: Yup.string()
        .trim()
        .lowercase()
        .required(val.emailRequired)
        .email(val.emailInvalid),
      phone: Yup.string()
        .required(val.phoneRequired)
        .matches(TAJIKISTAN_PHONE_REGEX, val.phoneMatch),
      organization: Yup.string()
        .trim()
        .required(val.orgRequired)
        .min(2, val.orgMin)
        .max(150, val.orgMax),
      position: Yup.string()
        .trim()
        .required(val.posRequired)
        .min(2, val.posMin),
      region: Yup.string().required(val.regionRequired),
      category: Yup.string().required(val.categoryRequired),
      format: Yup.string().required(val.formatRequired),
      consent: Yup.boolean()
        .oneOf([true], val.consentRequired || val.fullNameRequired)
        .required(),
    });
  }, [t]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      region: "",
      category: "",
      format: "",
      consent: false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (rawValues, { resetForm }) => {
      setIsSubmitting(true);
      const sanitized = sanitizeValues(rawValues);

      try {
        const formBody = new URLSearchParams();
        Object.keys(ENTRY_MAP).forEach((key) => {
          formBody.append(ENTRY_MAP[key], sanitized[key] || "");
        });

        // Единая одиночная отправка в Google Forms
        await fetch(GOOGLE_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        });

        // Авто-отправка письма на Email участника через EmailJS
        await sendEmailNotification(sanitized);

        setIsSubmitted(true);
        resetForm();
      } catch (error) {
        console.error("Ошибка отправки формы:", error);
        alert(t.registration.messages.errorDesc);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getFieldClass = (fieldName) => {
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];
    const hasValue =
      formik.values[fieldName] !== "" && formik.values[fieldName] !== false;

    let classes = "form-control";
    if (!hasValue) {
      classes += " is-empty";
    }
    if (isTouched && hasError) {
      classes += " input-invalid";
    } else if (isTouched && !hasError && hasValue) {
      classes += " input-valid";
    }
    return classes;
  };

  const handlePhoneBlur = (e) => {
    formik.handleBlur(e);
    const sanitizedPhone = sanitizeValues({ phone: formik.values.phone }).phone;
    if (sanitizedPhone !== formik.values.phone) {
      formik.setFieldValue("phone", sanitizedPhone);
    }
  };

  if (isSubmitted) {
    return (
      <div className="registration-wrapper">
        <div className="success-card">
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>
          <h2>{t.registration.messages.successTitle}</h2>
          <p>{t.registration.messages.successDesc}</p>
          <button
            type="button"
            className="submit-btn reset-btn"
            onClick={() => setIsSubmitted(false)}
          >
            {t.registration.buttons.submit}
          </button>
        </div>
      </div>
    );
  }

  const regLabels = t.registration.labels;
  const regRegions = t.registration.regions;
  const regCategories = t.registration.categories;
  const regFormats = t.registration.formats;

  return (
    <div className="registration-wrapper">
      <div className="form-container">
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="registration-form"
        >
          {/* СЕКЦИЯ 1 */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-number">1</span> {regLabels.fullName}
            </h3>

            <div className="form-group floating-group">
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={getFieldClass("fullName")}
                placeholder=" "
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="fullName" className="floating-label">
                {regLabels.fullName} <span className="required-star">*</span>
              </label>
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-message">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group floating-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={getFieldClass("email")}
                  placeholder=" "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    if (formik.values.email) {
                      formik.setFieldValue(
                        "email",
                        formik.values.email.trim().toLowerCase(),
                      );
                    }
                  }}
                />
                <label htmlFor="email" className="floating-label">
                  {regLabels.email} <span className="required-star">*</span>
                </label>
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group floating-group">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={getFieldClass("phone")}
                  placeholder=" "
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={handlePhoneBlur}
                />
                <label htmlFor="phone" className="floating-label">
                  {regLabels.phone} <span className="required-star">*</span>
                </label>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="error-message">{formik.errors.phone}</div>
                )}
              </div>
            </div>
          </div>

          {/* СЕКЦИЯ 2 */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-number">2</span> {regLabels.organization}
            </h3>

            <div className="form-row">
              <div className="form-group floating-group">
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className={getFieldClass("organization")}
                  placeholder=" "
                  value={formik.values.organization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="organization" className="floating-label">
                  {regLabels.organization}{" "}
                  <span className="required-star">*</span>
                </label>
                {formik.touched.organization && formik.errors.organization && (
                  <div className="error-message">
                    {formik.errors.organization}
                  </div>
                )}
              </div>

              <div className="form-group floating-group">
                <input
                  id="position"
                  name="position"
                  type="text"
                  className={getFieldClass("position")}
                  placeholder=" "
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="position" className="floating-label">
                  {regLabels.position} <span className="required-star">*</span>
                </label>
                {formik.touched.position && formik.errors.position && (
                  <div className="error-message">{formik.errors.position}</div>
                )}
              </div>
            </div>

            <div className="form-group floating-group">
              <select
                id="region"
                name="region"
                className={getFieldClass("region")}
                value={formik.values.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=""></option>
                {regRegions.map((option, idx) => (
                  <option key={idx} value={REGION_OPTIONS[idx] || option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="region" className="floating-label">
                {regLabels.region} <span className="required-star">*</span>
              </label>
              {formik.touched.region && formik.errors.region && (
                <div className="error-message">{formik.errors.region}</div>
              )}
            </div>
          </div>

          {/* СЕКЦИЯ 3 */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-number">3</span> {regLabels.category} &{" "}
              {regLabels.format}
            </h3>

            <div className="form-group floating-group">
              <select
                id="category"
                name="category"
                className={getFieldClass("category")}
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=""></option>
                {regCategories.map((option, idx) => (
                  <option key={idx} value={CATEGORY_OPTIONS[idx] || option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="category" className="floating-label">
                {regLabels.category} <span className="required-star">*</span>
              </label>
              {formik.touched.category && formik.errors.category && (
                <div className="error-message">{formik.errors.category}</div>
              )}
            </div>

            <div className="form-group floating-group">
              <select
                id="format"
                name="format"
                className={getFieldClass("format")}
                value={formik.values.format}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=""></option>
                {regFormats.map((option, idx) => (
                  <option key={idx} value={FORMAT_OPTIONS[idx] || option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="format" className="floating-label">
                {regLabels.format} <span className="required-star">*</span>
              </label>
              {formik.touched.format && formik.errors.format && (
                <div className="error-message">{formik.errors.format}</div>
              )}
            </div>
          </div>

          {/* ФУТЕР ФОРМЫ */}
          <div className="form-footer">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formik.values.consent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span>
                  {t.language === "tj"
                    ? "Ман ба коркарди маълумоти шахсӣ розигӣ медиҳам"
                    : t.language === "en"
                      ? "I consent to the processing of personal data"
                      : "Я согласен на обработку персональных данных"}{" "}
                  <span className="required-star">*</span>
                </span>
              </label>
              {formik.touched.consent && formik.errors.consent && (
                <div className="error-message">{formik.errors.consent}</div>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t.registration.buttons.submitting
                : t.registration.buttons.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
