

export default function FloodLogic(time: Object[], precipitation: number[], soilMoisture: number[], units: any): Object {
    let sumPrecipitationByDay: number[] = [];
    for (let i = 0; i < time.length; i += 24) {
        const dailyPrecipitation = precipitation.slice(i, i + 24).reduce((a, b) => a + b, 0);
        sumPrecipitationByDay.push(dailyPrecipitation);
    }

    let soilMoistureStartOfDay: number[] = [];
    for (let i = 0; i < soilMoisture.length; i += 24) {
        soilMoistureStartOfDay.push(soilMoisture[i]);
    }

    let riskScore: number[] = [];
    for (let i = 2; i < soilMoistureStartOfDay.length; i++) {
        riskScore.push((sumPrecipitationByDay[i - 2] * 0.2 + sumPrecipitationByDay[i - 1] * 0.5 + sumPrecipitationByDay[i] * 1.0) * (soilMoistureStartOfDay[i] + 1));
    }

    return {
        sumPrecipitationByDay: sumPrecipitationByDay,
        soilMoistureStartOfDay: soilMoistureStartOfDay,
        riskScore: riskScore,
        riskLevel: riskScore.map(score => {
            if (score < 50) {
                return 'Normal';
            }
            else if (score < 90) {
                return 'Advisory';
            } else if (score < 150) {
                return 'Warning';
            } else {
                return 'Danger';
            }
        }),

        units: {
            precipitation: units.precipitation,
            soilMoisture: units.soil_moisture_9_to_27cm,
        }
    };
}