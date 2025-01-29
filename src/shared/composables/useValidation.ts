import type { Rule, Status } from "@/shared/interfaces/Validation";
import { ref } from "vue";

export const useValidation = () => {
  const emailTouched = ref(false);
  const passwordTouched = ref(false);

  const required = (value: string): Status => {
    const result = Boolean(value);
    return {
      valid: result,
      message: result ? undefined : "This field is required",
    };
  };

  const length = ({ min, max }: { min: number; max: number }) => {
    return function (value: string): Status {
      const result = Boolean(value.length > min && value.length < max);
      return {
        valid: result,
        message: result
          ? undefined
          : `This field must be between ${min} and ${max} characters`,
      };
    };
  };

  const complexPassword = (value: string): Status => {
    const result = Boolean(
      value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    );
    return {
      valid: result,
      message: result
        ? undefined
        : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    };
  };

  const email = (value: string): Status => {
    const result = Boolean(
      value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    );
    return {
      valid: result,
      message: result ? undefined : "Invalid email",
    };
  };

  const validate = (value: string, rules: Rule[]): Status => {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true };
  };

  return {
    required,
    length,
    complexPassword,
    email,
    validate,
    emailTouched,
    passwordTouched
  };
};
