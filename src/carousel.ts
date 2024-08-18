interface Carousel {
    holderId: string;
    elementClass: string;
    elementsPerSlide?: number;
    arrows?: boolean;
    indicators?: boolean;
    loop?: boolean;
    // autoPlay?: boolean;
    // interval?: number;
    // transitionDuration?: number;
    // transitionEffect?: 'fade' | 'slide';
}

function initCarousel(options: Carousel): void {
    const {
        elementsPerSlide = 1,
        arrows = true,
        indicators = true,
        loop = false,
    } = options;

    const holder: HTMLElement = document.querySelector(`#${options.holderId}`) as HTMLElement;
    const elements: HTMLElement[] = Array.from(holder.querySelectorAll(`.${options.elementClass}`)) as HTMLElement[];
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