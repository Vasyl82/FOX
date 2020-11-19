const getHazardousWorks = (state) => {
  const hazardousWorks = {
    work_at_height: state.work_at_height,
    lifting_work: state.lifting_work,
    confined_space: state.confined_space,
    hot_work: state.hot_work,
    chemical_handling: state.chemical_handling,
    work_alone: state.work_alone,
    work_at_sensitive_area: state.work_at_sensitive_area,
    cold_work: state.cold_work,
  };
  const chosenHazards = Object.entries(hazardousWorks)
    .filter(([work, value]) => value)
    .map(([key, value]) => key);
  const verboseHazards = chosenHazards
    .map((hazard) =>
      hazard
        .split("_")
        .map(([firstLetter, ...rest]) =>
          [firstLetter.toUpperCase(), ...rest].join("")
        )
        .join(" ")
    )
    .join("\n");
  return verboseHazards;
};

export { getHazardousWorks };
