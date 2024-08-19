interface Carousel {
    holderId: string;
    listId: string;
    elementClass: string;
    elementsPerSlide?: number;
    gap?: string;
    arrows?: boolean;
    indicators?: boolean;
    loop?: boolean;
    // autoPlay?: boolean;
    // interval?: number;
    // transitionDuration?: number;
    // transitionEffect?: "fade" | "slide";
}

function initCarousel(options: Carousel): void {
    const {
        elementsPerSlide = 1,
        gap = "0px",
        arrows = true,
        indicators = true,
        loop = false,
    } = options;

    const holder: HTMLElement = document.querySelector(`#${options.holderId}`) as HTMLElement;
    const list: HTMLElement = document.querySelector(`#${options.listId}`) as HTMLElement;
    const elements = holder.querySelectorAll<HTMLElement>(`.${options.elementClass}`);
    const perSlide = Number(elementsPerSlide);
    const validGapRegex = /^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|cm|mm|in|pt|pc)$/;

    let sliding: boolean = false;

    if (!options.holderId || options.holderId == "") {
        throw new Error("Carousel: property \"holderId\" not specified!");
    }

    if (!options.listId || options.listId == "") {
        throw new Error("Carousel: property \"listId\" not specified!");
    }

    if (!options.elementClass || options.elementClass == "") {
        throw new Error("Carousel: property \"elementClass\" not specified!");
    }

    if (!Number.isInteger(perSlide) || perSlide <= 0) {
        throw new Error("Carousel: property \"elementsPerSlide\" must be a positive integer!");
    }

    if (!holder) {
        throw new Error(`Carousel: Element with id "${options.holderId}" was not found!`);
    }

    if (!list) {
        throw new Error(`Carousel: Element with id "${options.holderId}" was not found!`);
    }

    if (!validGapRegex.test(gap)) {
        throw new Error('Carousel: property "gap" must be a valid CSS length value!');
    }

    if (elements.length === 0) {
        throw new Error(`Carousel: No elements with class "${options.elementClass}" were found!`);
    }


    const onStart = (event: MouseEvent | TouchEvent): void => {
        if (event.type === 'mousedown' || event.type === 'touchstart') {
            sliding = true;
        }
    };

    const onMove = (event: MouseEvent | TouchEvent): void => {
        if (!sliding) {
            return
        }

        let offsetX: number = 0;

        switch (event.type) {
            case "mousemove":
                const mouseEvent = event as MouseEvent;
                offsetX = mouseEvent.offsetX;
                break;
            case "mousemove":
                const touchEvent = event as TouchEvent;
                const touch = touchEvent.touches[0];
                const { left, right } = list!.getBoundingClientRect();
                offsetX = touch.clientX - left;
                break;
            default:
                throw new Error("There was en error with the \"onMove\" event!");
        }

        list.scrollLeft = offsetX / list.clientWidth * list.scrollWidth;
    };

    const onEnd = (event: MouseEvent | TouchEvent): void => {
        if (["mouseup", "touchend"].includes(event.type)) {
            console.log('Ended');
        }
        sliding = false;
    };

    const onCancel = (event: MouseEvent | TouchEvent): void => {
        if (event.type === 'mouseleave' || event.type === 'touchcancel') {
        }
        sliding = false;
    };

    holder.setAttribute("carouselholder", "");
    list.setAttribute("carousellist", "");
    list.style.gap = gap;

    elements.forEach((element, index) => {
        element.setAttribute("carouselelement", `${index}`);

        if (index < perSlide) {
            element.setAttribute("carouselvisible", "");
        }

        element.style.flexBasis = `calc((100% - (${perSlide} - 1) * ${gap}) / ${perSlide})`;

        element.addEventListener("mousedown", onStart);
        element.addEventListener("mousemove", onMove);
        element.addEventListener("mouseup", onEnd);
        element.addEventListener("mouseleave", onCancel);

        element.addEventListener("touchstart", onStart);
        element.addEventListener("touchmove", onMove);
        element.addEventListener("touchend", onEnd);
        element.addEventListener("touchcancel", onCancel);
    });
}

// 1. Mouse Events:

//     mousedown: Triggered when the user presses the mouse button down.
//     mousemove: Triggered when the user moves the mouse.
//     mouseup: Triggered when the user releases the mouse button.
//     mouseleave: Triggered when the mouse leaves the carousel area 
//                 (useful to cancel dragging if the user drags outside the carousel).

// 2. Touch Events:

//     touchstart: Triggered when the user touches the screen.
//     touchmove: Triggered when the user moves their finger on the screen.
//     touchend: Triggered when the user lifts their finger off the screen.
//     touchcancel: Triggered when the touch event gets interrupted
//                  (e.g., the user switches to another app, or an incoming call is detected).