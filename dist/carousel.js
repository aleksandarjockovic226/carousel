"use strict";
function initCarousel(options) {
    const { elementsPerSlide = 1, arrows = true, indicators = true, loop = false, } = options;
    const holder = document.querySelector(`#${options.holderId}`);
    const elements = Array.from(holder.querySelectorAll(`.${options.elementClass}`));
    const perSlide = Number(elementsPerSlide);
    if (!options.holderId || options.holderId == "") {
        throw new Error("Carousel: property 'holderId' not specified!");
    }
    if (!options.elementClass || options.elementClass == "") {
        throw new Error("Carousel: property 'elementClass' not specified!");
    }
    if (!Number.isInteger(perSlide) || perSlide <= 0) {
        throw new Error("Carousel: property 'elementsPerSlide' must be a positive integer!");
    }
    if (!holder) {
        throw new Error(`Carousel: Element with id '${options.holderId}' was not found!`);
    }
    if (elements.length === 0) {
        throw new Error(`Carousel: No elements with class '${options.elementClass}' were found!`);
    }
}
