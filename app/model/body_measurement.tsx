class BodyMeasurement {
    name: string = '';
    description: string = '';
    value: number = 0;
}

export const metricUnit: string = 'cm';

const bodyMeasurements: BodyMeasurement[] = [
        { name: 'Waist Circumference', description: 'Around the narrowest part of the torso. Bend to the side to find the natural waist. Use elastic tied horizontally as a reference point.', value: 0 },
        { name: 'Chest Circumference', description: 'Around the chest from under the arms at the armpit level. Keep your arms relaxed by your side.', value: 0 },
        { name: 'Bust Circumference', description: 'Around the fullest part of the bust.', value: 0 },
        { name: 'Bust Height', description: 'From the nape of the neck down the chest to the fullest part of the bust. Mark the nape with a marker or use a necklace as a reference.', value: 0 },
        { name: 'Shoulder Width (Back)', description: 'Across the back from shoulder point to shoulder point. The tape may curve slightly. Mark shoulder points for consistency.', value: 0 },
        { name: 'Back Width', description: 'Across the back from armpit crease to armpit crease. Keep arms relaxed by your side.', value: 0 },
        { name: 'Waist Length (Front)', description: 'From the nape of the neck down the chest (over the fullest part of the bust) to the waist.', value: 0 },
        { name: 'Waist Length (Back)', description: 'From the nape of the neck down the back to the waist.', value: 0 },
        { name: 'Hip Circumference', description: 'Around the fullest part of your bottom. Mark the hip level for consistency.', value: 0 },
        { name: 'Bicep Circumference', description: 'Around the fullest part of the upper arm.', value: 0 },
        { name: 'Elbow Length', description: 'From the shoulder point to the base of the elbow. Bend the arm so the forearm is parallel to the floor.', value: 0 },
        { name: 'Sleeve Length', description: 'From the shoulder point to the base of the elbow, then to the wrist. Keep the arm bent, with the forearm parallel to the floor.', value: 0 },
        { name: 'Hip Depth', description: 'From the side of the body from the waist to hip level.', value: 0 },
        { name: 'Thigh Circumference', description: 'Around the fullest part of the upper leg.', value: 0 },
        { name: 'Knee Circumference', description: 'Around the fullest part of the knee.', value: 0 },
        { name: 'Calf Circumference', description: 'Around the fullest part of the calf.', value: 0 },
        { name: 'Knee Length', description: 'From the side of the body from the waist to the knee level.', value: 0 },
        { name: 'Trouser Length', description: 'From the side of the body from the waist to the floor, or the top of your foot.', value: 0 },
        { name: 'Inseam', description: 'From the crotch straight down to the height of the ankle bone.', value: 0 },
        { name: 'Crotch Depth', description: 'Option 1: From the waist to the crotch in between the legs. Option 2: While sitting on a flat, hard surface, measure from the waist to the surface. Average the two if they differ.', value: 0 },
        { name: 'Standing Height', description: 'From the top of the head to the ground.', value: 0 },
    ];

export default bodyMeasurements;