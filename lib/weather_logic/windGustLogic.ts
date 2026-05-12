

function convertWindDirectionToCompass(degrees: number): string {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function windSpeedScore(maxWindSpeed: number): number {
    if (maxWindSpeed > 55) {
        return 3;
    } else if (maxWindSpeed > 35) {
        return 2;
    } else if (maxWindSpeed > 20) {
        return 1;
    }
    return 0;
}

function windGustScore(maxWindGust: number): number {
    if (maxWindGust > 80) {
        return 3;
    } else if (maxWindGust > 50) {
        return 2;
    } else if (maxWindGust > 30) {
        return 1;
    }
    return 0;
}

export default function WindGustLogic(time: string[], windGust: number[], windSpeed: number[], windDirection: number[], units: any): Object {
    let maxWindGustByDay: number[] = [];
    let maxWindSpeedByDay: number[] = [];
    let maxWindGustDirectionByDay: number[] = [];
    let maxWindSpeedDirectionByDay: number[] = [];

    for (let i = 0; i < time.length; i += 24) {
        const dailyWindGust = windGust.slice(i, i + 24);
        const dailyWindSpeed = windSpeed.slice(i, i + 24);
        const dailyWindDirection = windDirection.slice(i, i + 24);

        let maxWindGust = 0;
        let maxWindSpeed = 0;
        let maxWindGustDirection = 0;
        let maxWindSpeedDirection = 0;

        for (let j = 0; j < dailyWindGust.length; j++) {
            if (dailyWindGust[j] > maxWindGust) {
                maxWindGust = dailyWindGust[j];
                maxWindGustDirection = dailyWindDirection[j];
            }
            if (dailyWindSpeed[j] > maxWindSpeed) {
                maxWindSpeed = dailyWindSpeed[j];
                maxWindSpeedDirection = dailyWindDirection[j];
            }
        }

        maxWindGustByDay.push(maxWindGust);
        maxWindSpeedByDay.push(maxWindSpeed);
        maxWindGustDirectionByDay.push(maxWindGustDirection);
        maxWindSpeedDirectionByDay.push(maxWindSpeedDirection);
    }

    const riskLevelCategory = ['Normal', 'Advisory', 'Warning', 'Danger'];
    let riskLevel = [];
    let riskWindDirection = [];

    for (let i = 2; i < maxWindGustByDay.length; i++) {
        const gustScore: number = windGustScore(maxWindGustByDay[i]);
        const speedScore: number = windSpeedScore(maxWindSpeedByDay[i]);
        if (gustScore > speedScore) {
            riskLevel.push(riskLevelCategory[gustScore]);
            riskWindDirection.push(convertWindDirectionToCompass(maxWindGustDirectionByDay[i]));
        } else {
            riskLevel.push(riskLevelCategory[speedScore]);
            riskWindDirection.push(convertWindDirectionToCompass(maxWindSpeedDirectionByDay[i]));
        }
    }

    return {
        maxWindGustByDay: maxWindGustByDay,
        maxWindSpeedByDay: maxWindSpeedByDay,
        riskLevel: riskLevel,
        riskWindDirection: riskWindDirection,
        units: {
            windGust: units.wind_gusts_10m,
            windSpeed: units.wind_speed_10m,
            windDirection: units.wind_direction_10m,
        }
    };
}