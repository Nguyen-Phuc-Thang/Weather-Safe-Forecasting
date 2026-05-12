

export const floodAdvice: { [key: string]: string[] } = {
    'Normal': [
        'No threat'
    ],
    'Advisory': [
        'Stay Informed: Monitor local weather news and app updates frequently.',
        'Check Supplies: Ensure your emergency kit (food, water, flashlight) is ready.',
        'Clear Drains: Clear debris from gutters and drains around your home.'],
    'Warning': [
        'Move to Higher Ground: Relocate valuable items and electronics to upper floors.',
        'Secure Outdoor Items: Bring in or tie down outdoor furniture and equipment.',
        'Prepare Evacuation: Identify the safest route to an evacuation center.',
        'Protect Documents: Keep important papers (ID, deeds) in a waterproof container.'],
    'Danger': [
        'Evacuate Immediately: If advised by authorities, leave your home right away.',
        'Avoid Floodwaters: Never walk or drive through moving water.',
        'Cut Power & Gas: Turn off main switches to prevent fires or electrocution.',
        'Call for Help: Use emergency hotlines only if you are trapped or in danger.'
    ]
}


export const flashFloodAdvice: { [key: string]: string[] } = {
    'Normal': [
        'No threat'
    ],
    'Advisory': [
        'Avoid crossing low-lying stream crossings',
        'Keep an eye on rapid water level changes'
    ],
    'Warning': [
        'Move to higher ground immediately',
        'Do not attempt to drive through flooded roads',
        'Prepare for potential power outages'
    ],
    'Emergency': [
        'Abandon vehicles if surrounded by water',
        'Climb to the highest point possible (Roof if necessary)',
        'DO NOT wait for instructions, evacuate now',
    ]
}

export const windGustAdvice: { [key: string]: string[] } = {
    'Normal': ['No threat'],
    'Advisory': ['Secure loose lightweight objects', 'Small tree branches may break'],
    'Warning': ['Stay indoors', 'Avoid tall trees and billboards', 'Secure roofs and windows'],
    'Danger': ['Structural damage likely', 'Power outages expected', 'Seek shelter in a sturdy building']
}