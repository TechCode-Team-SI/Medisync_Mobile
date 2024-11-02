import { appErrorProps } from "@/src/types/types";

const defaultProps: appErrorProps = {
  error: "app_error",
  message: "Hubo un error inesperado.",
};

export class AppError extends Error {
  error: string;
  message: string;
  constructor(props?: appErrorProps) {
    super();
    const data = { ...defaultProps, ...props };
    this.error = data.error;
    this.message = data.message;
  }
}
