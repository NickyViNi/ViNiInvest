export const setNavbarBackgroundToTransparent = () => {
    const navbar = document.querySelector(".header");
    if (navbar) {
        navbar.style.backgroundColor = "transparent";
    }
}

export const setNavbarBackgroundToWhite = () => {
    const navbar = document.querySelector(".header");
    if (navbar) {
        navbar.style.backgroundColor = "white";
    }
}
