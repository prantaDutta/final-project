import { useRecoilState } from "recoil";
import { verificationStep } from "../../states/verificationStates";

interface NextPreviousButtonProps {
  nextDisabled: boolean;
}

const NextPreviousButton: React.FC<NextPreviousButtonProps> = ({
  nextDisabled,
}) => {
  const [step, setStep] = useRecoilState(verificationStep);

  return (
    <div
      className={`flex ${step > 0 ? "justify-between" : "justify-end"} mt-8`}
    >
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="bg-primary text-gray-100 p-3 w-1/3 rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
          shadow-lg transition-css"
        >
          Previous
        </button>
      )}
      <button
        type="submit"
        disabled={nextDisabled}
        className="bg-primary text-gray-100 p-3 w-1/3 rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
        shadow-lg transition-css disabled:opacity-50"
      >
        {step === 3 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default NextPreviousButton;
