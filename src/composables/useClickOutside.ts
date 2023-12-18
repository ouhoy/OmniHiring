import type {Ref} from "vue";
import {onBeforeUnmount, onMounted} from "vue";

function useClickOutside(targetElement: Ref, callback: Function) {
    if (!targetElement) return;
    let listener = (e: Event) => {

        // Clicked inside the modal/active region
        if (e.target === targetElement.value || e.composedPath().includes(targetElement.value)) return;

        // Clicked outside the modal
        if (typeof callback === "function") {
            callback()
        }
    }

    onMounted(() => {
        window.addEventListener("click", listener)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("click", listener)
    })

    return {listener}

}

export default useClickOutside