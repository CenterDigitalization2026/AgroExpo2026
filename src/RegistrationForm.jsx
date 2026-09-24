import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLanguage } from "./i18n/LanguageContext";
import "./RegistrationForm.css";

// Google Apps Script Web App REST API URL
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMW3dZEMsQNns1eCm3u8YtERvkf45JTijTLLd9hE2rEAmhhGGRQB9HAPyDtxYKr9VAJw/exec";



const FIO_REGEX = /^[a-zA-Zа-яА-ЯёЁҒғӢӣҚқӮӯҲҳҶҷ\s-]+$/;
const PHONE_REGEX = /^\+?\d{7,15}$/;

const sanitizeValues = (values) => {
  let cleanedPhone = (values.phone || "").trim().replace(/[^\d+]/g, "");
  if (cleanedPhone.startsWith("992") && !cleanedPhone.startsWith("+992")) {
    cleanedPhone = "+" + cleanedPhone;
  } else if (/^\d{9}$/.test(cleanedPhone)) {
    cleanedPhone = "+992" + cleanedPhone;
  } else if (cleanedPhone.length > 0 && !cleanedPhone.startsWith("+")) {
    cleanedPhone = "+" + cleanedPhone;
  }

  return {
    ...values,
    fullName: (values.fullName || "").trim().replace(/\s+/g, " "),
    email: (values.email || "").trim().toLowerCase(),
    phone: cleanedPhone,
    organization: (values.organization || "").trim().replace(/\s+/g, " "),
    position: (values.position || "").trim().replace(/\s+/g, " "),
    speakerRole: (values.speakerRole || "").trim(),
    otherCategory: (values.otherCategory || "").trim(),
  };
};

export const RegistrationForm = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
        .matches(PHONE_REGEX, val.phoneMatch),
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
      otherCategory: Yup.string().trim(),
      format: Yup.string().required(val.formatRequired),
      speakerRole: Yup.string().when("format", {
        is: (val) =>
          val &&
          (val.toLowerCase().includes("спикер") ||
            val.toLowerCase().includes("маър") ||
            val.toLowerCase().includes("speaker")),
        then: (schema) =>
          schema.required(
            language === "en"
              ? "Please select your presentation format"
              : language === "ru"
              ? "Выберите формат выступления спикера"
              : "Формати баромади спикерро интихоб кунед"
          ),
        otherwise: (schema) => schema.notRequired(),
      }),
      consent: Yup.boolean()
        .oneOf([true], val.consentRequired || val.fullNameRequired)
        .required(),
    });
  }, [t, language]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      region: "",
      category: "",
      otherCategory: "",
      format: "",
      speakerRole: "",
      consent: false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (rawValues, { resetForm }) => {
      setIsSubmitting(true);
      const sanitized = sanitizeValues(rawValues);

      const finalCategory =
        sanitized.otherCategory &&
        (sanitized.category.toLowerCase().includes("друг") ||
          sanitized.category.toLowerCase().includes("дигар") ||
          sanitized.category.toLowerCase().includes("other"))
          ? `${sanitized.category}: ${sanitized.otherCategory}`
          : sanitized.category;

      const finalFormat =
        sanitized.speakerRole &&
        (sanitized.format.toLowerCase().includes("спикер") ||
          sanitized.format.toLowerCase().includes("маър") ||
          sanitized.format.toLowerCase().includes("speaker"))
          ? `${sanitized.format} (${sanitized.speakerRole})`
          : sanitized.format;

      try {
        if (
          !GOOGLE_APPS_SCRIPT_URL ||
          GOOGLE_APPS_SCRIPT_URL.includes("УКАЖИТЕ_ВАШ_WEB_APP_URL")
        ) {
          console.warn(
            "Google Apps Script Web App URL не установлен в RegistrationForm.jsx",
          );
        }

        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            ...sanitized,
            fullName: sanitized.fullName,
            name: sanitized.fullName,
            fio: sanitized.fullName,
            email: sanitized.email,
            phone: sanitized.phone,
            organization: sanitized.organization,
            company: sanitized.organization,
            position: sanitized.position,
            region: sanitized.region,
            category: finalCategory,
            otherCategory: sanitized.otherCategory,
            format: finalFormat,
            speakerRole: sanitized.speakerRole,
            language: language || "tj",
          }),
        });

        const result = await response.json();

        if (
          result &&
          (result.status === "success" || result.status === "already_registered")
        ) {
          setIsPending(true);
          resetForm();
        } else if (result && result.status === "error") {
          const errorMsg =
            result.message ||
            (t.registration.messages && t.registration.messages.errorDesc) ||
            "Произошла ошибка";
          alert(errorMsg);
        } else {
          // Любой ответ сервера с приемом заявки переводит в экран успеха
          setIsPending(true);
          resetForm();
        }
      } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        alert(
          (t.registration.messages && t.registration.messages.errorDesc) ||
            "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.",
        );
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

  const handleResetRegistration = () => {
    setIsPending(false);
  };

  if (isPending) {
    const msg = t.registration.messages || {};
    const btnText =
      (t.registration.buttons && t.registration.buttons.newRegistration) ||
      "Подать ещё одну заявку";
    return (
      <div className="registration-wrapper">
        <div className="success-card">
          <div className="pending-badge-tag">
            {msg.pendingBadge || "⏳ На рассмотрении"}
          </div>
          <div className="success-icon pending-icon" aria-hidden="true">
            ⏳
          </div>
          <h2>{msg.pendingTitle || "Заявка на рассмотрении"}</h2>
          <p>
            {msg.pendingDesc ||
              "Ваши данные успешно получены оргкомитетом Digital AgriExpo Tajikistan-2026 и проходят проверку."}
          </p>
          <div className="email-invitation-box">
            <span className="email-invitation-icon">✉️</span>
            <span>
              {language === "en"
                ? "An official email invitation confirming your participation will be sent after the review process."
                : language === "ru"
                ? "Официальное приглашение с подтверждением участия будет отправлено на ваш Email после проверки."
                : "Даъватномаи расмӣ бо тасдиқи иштирок пас аз баррасӣ ба Email-и шумо фиристода мешавад."}
            </span>
          </div>
          <button
            type="button"
            className="submit-btn reset-btn"
            onClick={handleResetRegistration}
          >
            {btnText}
          </button>
        </div>
      </div>
    );
  }

  const regLabels = t.registration.labels;
  const regRegions = t.registration.regions;
  const regCategories = t.registration.categories;
  const regFormats = t.registration.formats;

  const isSpeaker = Boolean(
    formik.values.format &&
      (formik.values.format.toLowerCase().includes("спикер") ||
        formik.values.format.toLowerCase().includes("маър") ||
        formik.values.format.toLowerCase().includes("speaker"))
  );

  const isOtherCategory = Boolean(
    formik.values.category &&
      (formik.values.category.toLowerCase().includes("друг") ||
        formik.values.category.toLowerCase().includes("дигар") ||
        formik.values.category.toLowerCase().includes("other"))
  );

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
                  <option key={idx} value={option}>
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
                  <option key={idx} value={option}>
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

            {isOtherCategory && (
              <div className="form-group floating-group sub-option-group">
                <input
                  id="otherCategory"
                  name="otherCategory"
                  type="text"
                  className={getFieldClass("otherCategory")}
                  placeholder=" "
                  value={formik.values.otherCategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="otherCategory" className="floating-label">
                  {regLabels.otherCategory || "Укажите вашу категорию"}
                </label>
              </div>
            )}

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
                  <option key={idx} value={option}>
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

            {isSpeaker && (
              <div className="form-group floating-group sub-option-group">
                <select
                  id="speakerRole"
                  name="speakerRole"
                  className={getFieldClass("speakerRole")}
                  value={formik.values.speakerRole}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value=""></option>
                  {(t.registration.speakerRoles || []).map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="speakerRole" className="floating-label">
                  {regLabels.speakerRole || "Формат выступления спикера"}{" "}
                  <span className="required-star">*</span>
                </label>
                {formik.touched.speakerRole && formik.errors.speakerRole && (
                  <div className="error-message">
                    {formik.errors.speakerRole}
                  </div>
                )}
              </div>
            )}
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
                  {t.registration.labels.consentLabel}{" "}
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
