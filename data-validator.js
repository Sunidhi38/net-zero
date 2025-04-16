class DataValidator {
    static validateSensorData(data) {
        const validationRules = {
            temperature: {
                min: -50,
                max: 100,
                type: 'number'
            },
            humidity: {
                min: 0,
                max: 100,
                type: 'number'
            },
            co2: {
                min: 0,
                max: 5000,
                type: 'number'
            }
        };

        const errors = [];

        for (const [key, rules] of Object.entries(validationRules)) {
            if (data[key] === undefined) {
                errors.push(`Missing ${key} value`);
                continue;
            }

            if (typeof data[key] !== rules.type) {
                errors.push(`Invalid type for ${key}`);
                continue;
            }

            if (data[key] < rules.min || data[key] > rules.max) {
                errors.push(`${key} value out of range`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

export { DataValidator }; 