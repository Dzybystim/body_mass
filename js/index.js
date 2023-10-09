const formElement = document.querySelector(".calculator_form_js");
const paramFormElement = document.querySelector(".calculator_param_js");
const meaningWeightTextElem = document.querySelector(".resultMeans-text");
const superBoxElem = document.querySelector(".calculator_super-box");

function resultText(BMI) {
  let result;
  let text;

  if (18.5 > BMI) {
    result = "below normal weight";
    text =
      "A BMI below 18.5 is considered a “below normal weight.”.Eating small, frequent meals: Extra calories are needed to gain weight, but chronically underweight people eat too much too quickly. Therefore, nutritionists advise splitting up meals - instead of breakfast, lunch and dinner, make 5-6 meals.";
  } else if (18.5 <= BMI && BMI < 25) {
    result = "healthy weight";
    text =
      "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.'Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.";
  } else if (25 <= BMI && BMI < 30) {
    result = "overweight";
    text =
      "A BMI range of 25 to 29.9 is considered a 'overweight.' Overweight and obesity, as well as the noncommunicable diseases associated with them, are largely preventable. Enabling environments and community support are critical to helping people decide to adopt a healthier diet and regular physical activity as the most appropriate choice (i.e. affordable and feasible) to help prevent overweight and obesity .";
  } else if (30 <= BMI && BMI < 35) {
    result = "obesity I degree";
    text =
      "A BMI range of 30 to 34.9 is considered a 'obesity I degree.' Vam Gaiki";
  } else if (35 <= BMI && BMI < 40) {
    result = "obesity II degree";
    text =
      "A BMI range of 35 to 39.9 is considered a 'obesity II degree.' Vam Gaiki";
  } else if (BMI >= 40) {
    result = "obesity III degree";
    text = "A BMI above 40 is considered “class III obesity.” Vam Gaiki";
  }

  // resultTextElenent.innerHTML = `${result}`;
  meaningWeightTextElem.innerHTML = `${text}`;

  return result;
}

function recommendedWeight(height) {
  const squareHeight = height * height;
  const lowThreshold = squareHeight * 18.5;
  const highThreshold = squareHeight * 25;

  return `${lowThreshold.toFixed(1)}kgs - ${highThreshold.toFixed(1)}kgs`;
}

function recommendedWeightImperial(height) {
  const squareHeight = height * height;
  const lowThreshold = squareHeight * (18.5 / 703);
  const highThreshold = squareHeight * (25 / 703);

  return `${(lowThreshold / 14).toFixed(0)}st 
  ${(lowThreshold % 14).toFixed(0)}lbs - ${(highThreshold / 14).toFixed(0)}st
  ${(highThreshold % 14).toFixed(0)}lbs`;
}

function handleSubmit(event) {
  if (paramFormElement.elements.height && paramFormElement.elements.weight) {
    if (event.key === "Enter") {
      const height = Number(paramFormElement.elements.height.value);
      const weight = Number(paramFormElement.elements.weight.value);

      if (isNaN(height) || isNaN(weight)) {
        numberBMI.innerHTML = `<span class="calculator_warning">Please enter numeric data</span>`;
        return;
      }

      const heightMetr = height / 100;
      const metricBMI = weight / (heightMetr * heightMetr);
      const metricBMIround = metricBMI.toFixed(1);

      const result = resultText(metricBMIround);
      const recommended = recommendedWeight(heightMetr);

      superBoxElem.innerHTML = `
      <div class="calculator_text-box">
              <div class="calculator_result-header">
                <h3 class="calculator_text-box-header">Your BMI is...</h3>
                <span class="calculator_text-box-grade">${metricBMIround}</span>
              </div>
              <p class="calculator_text-box-text">
                Your BMI suggests you're a
                <span class="result_js">${result}</span>. You ideal weight
                is between
                <span class="calculator_bolt-text">${recommended}</span>.
              </p>
      </div>
      `;
      return;
    }
    return;
  } else if (
    paramFormElement.elements.height_ft &&
    paramFormElement.elements.weight_st
  ) {
    if (event.key === "Enter") {
      const heightFt = Number(paramFormElement.elements.height_ft.value);
      const heightIn = Number(paramFormElement.elements.height_in.value);
      const weightSt = Number(paramFormElement.elements.weight_st.value);
      const weightLbs = Number(paramFormElement.elements.weight_lbs.value);

      if (
        isNaN(heightFt) ||
        isNaN(heightIn) ||
        isNaN(weightSt) ||
        isNaN(weightLbs)
      ) {
        numberBMI.innerHTML = `<span class="calculator_warning">Please enter numeric data</span>`;
        return;
      }

      const heightImperial = heightFt * 12 + heightIn;
      const weightImperial = weightSt * 14 + weightLbs;

      const imperialBMI =
        (weightImperial / (heightImperial * heightImperial)) * 703;
      const imperialBMIround = imperialBMI.toFixed(1);

      const result = resultText(imperialBMIround);
      const recommended = recommendedWeightImperial(heightImperial);

      superBoxElem.innerHTML = `
      <div class="calculator_text-box">
              <div class="calculator_result-header">
                <h3 class="calculator_text-box-header">Your BMI is...</h3>
                <span class="calculator_text-box-grade">${imperialBMIround}</span>
              </div>
              <p class="calculator_text-box-text">
                Your BMI suggests you're a
                <span class="result_js">${result}</span>. You ideal weight
                is between
                <span class="calculator_bolt-text">${recommended}</span>.
              </p>
      </div>
      `;
      return;
    }
    return;
  }
}

function addSystem(event) {
  const elem = event.target.value;
  if (elem === "metric") {
    paramFormElement.innerHTML = `
    <div class="calculator_param">
    <label>
    <h3
      class="calculator_parameters-header calculator_parameters-header--indent"
    >
      Height
    </h3>
    <div class="calculator_box-input">
      <input
        type="text"
        name="height"
        class="calculator_input calculator_input--indent"
        pattern="[0-9]+"
        title="You can only enter numbers"
        minlength="1"
        maxlength="3"
      />
      <span class="calculator_units">cm</span>
    </div>
  </label>
  <label>
    <h3
      class="calculator_parameters-header calculator_parameters-header--indent"
    >
      Weight
    </h3>
    <div class="calculator_box-input">
      <input 
      type="text" 
      name="weight" 
      class="calculator_input"
      pattern="[0-9]+"
      title="You can only enter numbers"
      minlength="1"
      maxlength="3"
      />
      <span class="calculator_units">kg</span>
    </div>
  </label>
  </div>`;
  } else if (elem === "imperial") {
    paramFormElement.innerHTML = `
    <label>
              <h3
                class="calculator_parameters-header calculator_parameters-header--indent"
              >
                Height
              </h3>
              <div class="calculator_box-imperial calculator_box-imperial--indent">
                <div class="calculator_box-input">
                  <input
                    type="text"
                    name="height_ft"
                    class="calculator_input calculator_inputImperial calculator_input--indent"
                    pattern="[0-9]+"
                    title="You can only enter numbers"
                    minlength="1"
                    maxlength="3"
                  />
                  <span class="calculator_units">ft</span>
                </div>
                <div class="calculator_box-input">
                  <input
                    type="text"
                    name="height_in"
                    class="calculator_input calculator_inputImperial calculator_input--indent"
                    pattern="[0-9]+"
                    title="You can only enter numbers"
                    minlength="1"
                    maxlength="3"
                  />
                  <span class="calculator_units">in</span>
                </div>
              </div>
            </label>
            <label>
              <h3
                class="calculator_parameters-header calculator_parameters-header--indent"
              >
                Weight
              </h3>
              <div class="calculator_box-imperial">
                <div class="calculator_box-input">
                  <input
                    type="text"
                    name="weight_st"
                    class="calculator_input calculator_inputImperial"
                    pattern="[0-9]+"
                    title="You can only enter numbers"
                    minlength="1"
                    maxlength="3"
                  />
                  <span class="calculator_units">st</span>
                </div>
                <div class="calculator_box-input">
                  <input
                    type="text"
                    name="weight_lbs"
                    class="calculator_input calculator_inputImperial"
                    pattern="[0-9]+"
                    title="You can only enter numbers"
                    minlength="1"
                    maxlength="3"
                  />
                  <span class="calculator_units">lbs</span>
                </div>
              </div>
            </label>`;
  }
}

formElement.addEventListener("change", addSystem);

paramFormElement.addEventListener("keyup", handleSubmit);
