import React from "react";
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

const safetyDeclarations = [
  "The person in charge/contractor’s supervisor will be wholly responsible and accountable for the behavior and safety of his worker and implement all safety measures.",
  "By acknowledging this he/she shall be responsible for any incident or accident and hereby agreed upon all of the above terms and conditions. The University shall have the authority to stop work immediately if the regulations are not met.",
  "Please attach this permit with a list of workers’ name & identification number (IC/work permit/passport) as well as risk assessment, method statement, HIRAC or any other relevant document as requested by the university.",
  "Contractor shall not plug in any gadget or laptop to the university’s network or power point unless permitted.",
  "Contractor's PIC must give instructions to workers and be present at site at all time to supervise the work.",
  "Contractor must wear employee pass and suitable PPE at all time whenever they are at site.",
  "Work on weekend or public holidays will need approval from the authorizing person from the Client’s department.",
  "30km/h speed limits for vehicle should apply and priority to pedestrian.",
  "Contractor is forbidden to enter areas in which not stated in the permit.",
  "Any usage of fire extinguishing equipment must be report to the university immediately.",
  "Any damages done to the university’s property shall be reported immediately and if in any case damages not reported, additional penalty will be imposed to the contractor on top of the rectification cost.",
  "Contractor should not store any equipment, machinery or tools within the university’s premises. If there is a need, contractor must clarify and liaise with Head of Engineering Services for temporary storage.",
  "Smoking is prohibited unless at the designated area.",
  "The workplace must be kept clean and tidy after the work completed or stopped and needs to resume the next day.",
  "Malaysia’s OSHA 1994 of safety regulation for hot work, working at height, excavation and lock-out, LOTO and confined spaces shall apply.",
  "Work must be stopped at 5.30 pm unless permitted by the university. Doors must be locked and lights turned off.",
  "All vehicle should park at the designated parking area.",
  "The validity of each permit is 7 days from the date of issuance.",
  "The university will not be liable for any accident occurred at site after issuing this permit.",
  "The permit to work should be submitted 3 working days prior commencement of work.",
];

export default function SafetyDeclarationsCard() {
  return (
    <>
      <CCardSubtitle className="pt-5 pb-3 mb-1 h4">Declarations:</CCardSubtitle>
      <CCard>
        <CCardBody>
          <CListGroup flush>
            {safetyDeclarations.map((declaration, idx) => (
              <CListGroupItem key={idx}>{declaration}</CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  );
}
