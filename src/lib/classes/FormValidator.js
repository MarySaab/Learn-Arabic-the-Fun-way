// FormValidator — real-time validation for the booking form, written as an ES6
// class (rubric: logic lives in classes). Each field has its own method that
// returns an Arabic error string, or "" when the value is valid. The form calls
// validateField as the user types, and validateAll before submitting.
export default class FormValidator {
  validateName(value = "") {
    if (!value.trim()) return "الاسم مطلوب";
    if (value.trim().length < 2) return "الاسم قصير جداً";
    return "";
  }

  validateEmail(value = "") {
    if (!value.trim()) return "البريد الإلكتروني مطلوب";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.trim())) return "بريد إلكتروني غير صالح";
    return "";
  }

  validatePhone(value = "") {
    if (!value.trim()) return "رقم الهاتف مطلوب";
    const digits = value.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return "رقم هاتف غير صالح";
    return "";
  }

  validatePreferredTime(value = "") {
    if (!value.trim()) return "الرجاء اختيار وقتٍ مناسب";
    return "";
  }

  // level and message are optional, so they always pass.
  validateField(name, value) {
    switch (name) {
      case "name":          return this.validateName(value);
      case "email":         return this.validateEmail(value);
      case "phone":         return this.validatePhone(value);
      case "preferredTime": return this.validatePreferredTime(value);
      default:              return "";
    }
  }

  // Returns an errors object { field: message }. Empty strings mean valid.
  validateAll(values = {}) {
    return {
      name:          this.validateName(values.name),
      email:         this.validateEmail(values.email),
      phone:         this.validatePhone(values.phone),
      preferredTime: this.validatePreferredTime(values.preferredTime),
    };
  }

  isValid(values = {}) {
    return Object.values(this.validateAll(values)).every((msg) => !msg);
  }
}
