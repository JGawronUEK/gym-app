<template>
    <div class="form">
      <form @submit.prevent="submitForm">
        <label>Height (cm)</label>
        <input type="number" v-model="height" required>
  
        <label>Weight (kg)</label>
        <input type="number" v-model="weight" required>
  
        <label>Activity Level</label>
        <select v-model="activityLevel" required>
          <option value="sedentary">Sedentary</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>
  
        <label>Goal</label>
        <select v-model="goal" required>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
  
        <button class="submit-btn" type="submit">Calculate</button>
      </form>
  
      <div class="result" v-if="result">
        <p>BMI: {{ result.bmi }}</p>
        <p>Proposed Calorie Intake: {{ result.calories }}</p>
        <p>Proposed Macros:</p>
        <ul>
          <li>Proteins: {{ result.proteins }}g</li>
          <li>Carbs: {{ result.carbs }}g</li>
          <li>Fats: {{ result.fats }}g</li>
        </ul>
      </div>
    </div>
</template>
  
<style>
    .form {
      background-color: #f4f4f4;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      padding: 20px;
    }
  
    .result {
        background-color: #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
    }

    .result p {
        margin: 0;
    }

    .result ul {
        list-style: none;
        padding: 0;
        margin: 10px 0;
    }

    .result li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #d4d4d4;
        padding: 10px 0;
    }

    .result li:first-of-type {
        border-top: none;
    }
  
    .submit-btn {
      background-color: #9c9393;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
    }
  
    .submit-btn:hover {
      background-color: #039ea3;
    }
  
    input[type="number"],
    select {
      background-color: #f9f9f9;
      border: 1px solid #d4d4d4;
      border-radius: 10px;
      padding: 10px 15px;
      font-size: 16px;
      margin-bottom: 10px;
      width: 100%;
    }
  
    label {
      font-weight: bold;
      text-align: left;
      display: block;
      margin-bottom: 5px;
      color: #333;
    }
  
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    li {
      margin-bottom: 5px;
    }
</style>
  
  
<script>
    export default {
        data() {
        return {
            height: null,
            weight: null,
            activityLevel: null,
            goal: null,
            result: null,
        };
        },

        methods: {
            calculate() {
                const heightInMeters = this.height / 100;
                const bmi = this.weight / (heightInMeters * heightInMeters);

                let bmr = 0;

                if (this.activityLevel === 'sedentary') {
                    bmr = 1.2 * (655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * 30));
                } else if (this.activityLevel === 'moderate') {
                    bmr = 1.55 * (655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * 30));
                } else {
                    bmr = 1.9 * (655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * 30));
                }

                let calories = 0;

                if (this.goal === 'lose') {
                    calories = bmr - 500;
                } else if (this.goal === 'maintain') {
                    calories = bmr;
                } else {
                    calories = bmr + 500;
                }

                const proteins = this.weight * 1.2;
                const carbs = calories * 0.45 / 4;
                const fats = calories * 0.25 / 9;

                this.result = {
                bmi: bmi.toFixed(2),
                calories: Math.round(calories),
                proteins: proteins.toFixed(2),
                carbs: carbs.toFixed(2),
                fats: fats.toFixed(2),
                };
            },
            submitForm() {
                // check if all required fields have a value
                if (!this.height || !this.weight || !this.activityLevel || !this.goal) {
                    alert("Please fill in all required fields.");
                    return;
                }
                
                // if all required fields have a value, call the calculate method
                this.calculate();
            },
        },
    };
</script>
