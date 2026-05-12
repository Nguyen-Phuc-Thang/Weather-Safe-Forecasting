

function calculateRiskLevel(windGust: number, cape: number, weatherCode: number): string {
    if (weatherCode >= 95 || cape >= 500) {
        if (500 <= cape && cape <= 1500) {
            return 'Advisory';
        } else if (weatherCode == 95 || weatherCode == 96 || cape > 1500) {
            return 'Warning';
        } else if (weatherCode == 99 || windGust > 80 || cape > 2500) {
            return 'Emergency';
        }
    }
    return 'Normal';
}


export default function ThunderstormLogic(time: Object[], windGust: number[], cape: number[], weatherCode: number[], units: any): Object {
    let maxWindGustByDay: number[] = [];
    let maxWeatherCodeByDay: number[] = [];
    let maxCapeByDay: number[] = [];

    for (let i = 0; i < time.length; i += 24) {
        const dailyMaxWindGust = Math.max(...windGust.slice(i, i + 24));
        const dailyMaxWeatherCode = Math.max(...weatherCode.slice(i, i + 24));
        const dailyMaxCape = Math.max(...cape.slice(i, i + 24));
        maxWindGustByDay.push(dailyMaxWindGust);
        maxWeatherCodeByDay.push(dailyMaxWeatherCode);
        maxCapeByDay.push(dailyMaxCape);
    }


    let riskLevel: string[] = [];

    for (let i = 2; i < maxWindGustByDay.length; i++) {
        riskLevel.push(calculateRiskLevel(maxWindGustByDay[i], maxCapeByDay[i], maxWeatherCodeByDay[i]));
    }

    return {
        riskLevel: riskLevel,
        maxWindGustByDay: maxWindGustByDay,
        maxCapeByDay: maxCapeByDay,
        units: {
            windGust: units.wind_gusts_10m,
            cape: units.cape,
        }
    }
}