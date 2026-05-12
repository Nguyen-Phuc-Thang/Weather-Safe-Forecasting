import { PagesDevOverlayBridge } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";

export default function FlashFloodLogic(time: Object[], precipitation: number[], soilMoistureSurface: number[], units: any): Object {
    let maxPrecipitationByDay: number[] = [];
    let maxTripleHourPrecipitationByDay: number[] = [];
    let smSurfaceAtPrecipitationPeak: number[] = [];
    let amplifierByDay: number[] = [];

    for (let i = 0; i < time.length; i += 24) {
        const dailyPrecipitation = precipitation.slice(i, i + 24);

        let maxPrecipitation = 0;
        let maxPrecipitationIndex = 0;
        for (let j = 0; j < dailyPrecipitation.length; j++) {
            if (dailyPrecipitation[j] > maxPrecipitation) {
                maxPrecipitation = dailyPrecipitation[j];
                maxPrecipitationIndex = j;
            }
        }
        maxPrecipitationByDay.push(maxPrecipitation);
        let peakSMSurface = soilMoistureSurface[i + maxPrecipitationIndex];
        smSurfaceAtPrecipitationPeak.push(peakSMSurface);
        let K = 0;
        if (peakSMSurface < 0.2) {
            K = 0.8;
        } else if (peakSMSurface < 0.35) {
            K = 1.0;
        } else if (peakSMSurface < 0.45) {
            K = 1.3;
        } else {
            K = 1.5;
        }

        amplifierByDay.push(K);

        let maxTripleHour = 0;
        for (let j = 0; j < dailyPrecipitation.length - 2; j++) {
            const tripleHourPrecipitation = dailyPrecipitation[j] + dailyPrecipitation[j + 1] + dailyPrecipitation[j + 2];
            if (tripleHourPrecipitation > maxTripleHour) {
                maxTripleHour = tripleHourPrecipitation;
            }
        }
        maxTripleHourPrecipitationByDay.push(maxTripleHour);
    }

    let riskScore: number[] = [];
    for (let i = 2; i < maxPrecipitationByDay.length; i++) {
        riskScore.push((maxPrecipitationByDay[i] * 0.7 + maxTripleHourPrecipitationByDay[i] * 0.3) * amplifierByDay[i]);
    }

    return {
        maxPrecipitationByDay: maxPrecipitationByDay,
        maxTripleHourPrecipitationByDay: maxTripleHourPrecipitationByDay,
        smSurfaceAtPrecipitationPeak: smSurfaceAtPrecipitationPeak,
        amplifierByDay: amplifierByDay,
        riskScore: riskScore, // First two excluded
        riskLevel: riskScore.map(score => {
            if (score < 15) {
                return 'Normal';
            }
            else if (score < 30) {
                return 'Advisory';
            } else if (score < 50) {
                return 'Warning';
            } else {
                return 'Emergency';
            }
        }),
        units: {
            precipitation: units.precipitation,
            soilMoisture: units.soil_moisture_0_to_1cm,
        },
    };
}