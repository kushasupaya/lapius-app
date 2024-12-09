interface Props {
  summary: string;
}
const Summary = () => (
  <div className="space-y-4">
    <p>
      <span className="font-semibold underline text-lg">
        Visit Date (March 24, 2022):
      </span>
      <br />
      The patient, John Doe, visited the hospital or medical facility for a
      same-day service, as the admission and discharge dates are both listed as
      03/24/2022.
    </p>
    <p>
      <span className="font-semibold">Blood Draw (Venipuncture):</span>
      The first service listed is a venipuncture (blood draw). This indicates
      that the patient underwent one or more blood tests, suggesting a
      diagnostic workup or routine health check.
    </p>
    <p>
      <span className="font-semibold underline">Blood Tests Performed:</span>
      <br />
      <span className="font-semibold ">
        Celiac Screen (Gamma Globulin-IGA):
      </span>{" "}
      A test to evaluate for celiac disease or immune responses related to
      gluten intolerance.
      <br />
      <span className="font-semibold ">Comprehensive Metabolic Panel:</span> A
      broad-spectrum blood test to assess organ function (e.g., liver, kidneys),
      electrolytes, and overall metabolic health.
      <br />
      <span className="font-semibold ">Vitamin D Test:</span> A specific test to
      measure the levels of Vitamin D, which could indicate nutritional
      deficiencies or issues related to bone health.
    </p>
    <p>
      <span className="font-semibold underline">Chest X-Ray:</span>
      <br />
      The patient also underwent a chest X-ray (2 views), which is often used to
      evaluate the lungs, heart, or other structures in the chest. This could
      indicate that the patient was experiencing symptoms such as chest pain,
      shortness of breath, or a persistent cough, prompting further
      investigation.
    </p>
    <p>
      <span className="font-semibold underline">
        Possible Context or Scenarios:
      </span>
      <br />
      The combination of tests suggests the patient might have presented with
      generalized symptoms such as fatigue, weakness, gastrointestinal issues,
      or respiratory concerns.
      <br />
      Alternatively, the patient may have been undergoing a routine evaluation
      or follow-up related to a known condition, such as celiac disease,
      nutritional deficiency, or respiratory issues.
      <br />
      The chest X-ray suggests the provider might have been investigating
      potential respiratory or cardiac concerns (e.g., pneumonia, heart
      problems, or a chest injury).
    </p>
    <p>
      <span className="font-semibold ">
        The combination of these tests suggests the patient may have been
        evaluated for:
      </span>
      <br />
      <span className="font-semibold underline">
        Celiac Disease or Nutritional Deficiencies:
      </span>{" "}
      The celiac screening and Vitamin D test could point to concerns about
      malabsorption or deficiencies due to a gastrointestinal condition.
      <br />
      <span className="font-semibold underline">
        Metabolic or Systemic Health Issues:
      </span>{" "}
      The comprehensive metabolic panel indicates a general health evaluation.
      <br />
      <span className="font-semibold underline">
        Respiratory or Cardiac Conditions:
      </span>{" "}
      The chest X-ray could suggest investigation into symptoms such as chest
      pain, shortness of breath, or suspected respiratory infections like
      pneumonia.
    </p>
  </div>
);
const SummarySection = ({ summary }: Props) => {
  return (
    <div className="w-full h-full p-5 pt-3 text-left">
      <Summary />
    </div>
    // <div
    //   className="w-full h-full p-5 pt-3 text-left"
    //   dangerouslySetInnerHTML={{ __html: summary }}
    // ></div>
  );
};

export default SummarySection;
