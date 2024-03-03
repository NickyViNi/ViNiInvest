export const generateRandomColors = (number) => {
    if (number <= 0) {
        return
    }

    const colors = [];
    for (let i = 0; i < number; i++) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        colors.push(randomColor);
    }
    return colors;
}

// console.log(generateRandomColors(6))
