import HelperText from "@/components/share/helperText";

type ValidationError = {
  field: string;
  message: string;
};

export type ActionError = {
  validationErrors?: Record<string, ValidationError>;
  serverError?: string;
  message?: string;
};

interface ActionErrorUIProps {
  result: ActionError;
  hasErrored: boolean;
}

export function ActionErrorUI({ result, hasErrored }: ActionErrorUIProps) {
  return (
    <section aria-label="errors">
      {hasErrored && result.serverError && (
        <HelperText className="text-red-500">{result.serverError}</HelperText>
      )}

      {hasErrored && result.validationErrors && (
        <div className="flex flex-col gap-2">
          {Object.values(result.validationErrors).map((error, index) => (
            <HelperText key={index} className="text-red-500">
              {error.message}
            </HelperText>
          ))}
        </div>
      )}
    </section>
  );
}

export default ActionErrorUI;
