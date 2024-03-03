export const generateRandomColors = (number, lightValue) => {
    if (number <= 0) {
        return
    }

    const colors = [];
    const useColors = new Set();
    while (colors.length < number) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        if (!useColors.has(randomColor) && isLightColor(randomColor, lightValue)) {
            useColors.add(randomColor);
            colors.push(randomColor);
        }
    }
    return colors;
}

const isLightColor = (color, threshold) => {
    const rgb = color.slice(1).match(/(.{2})/g).map(x => parseInt(x, 16));
    const brightness = (rgb[0] * 0.2126) + (rgb[1] * 0.7152) + (rgb[2] * 0.0722);
    return brightness >= threshold;
}

// console.log(generateRandomColors(6))
