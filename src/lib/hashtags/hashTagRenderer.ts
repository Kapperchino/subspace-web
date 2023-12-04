import type { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion';
import {
    computePosition,
    type ClientRectObject,
    type VirtualElement,
} from '@floating-ui/dom';
import HashTagsComponent from './hashTagsComponent.svelte';


export type Coordinate = {
    top: number;
    left: number;
    bottom: number;
    pos: number;
};

export const hashTagsRenderer = () => {
    let component: HashTagsComponent, wrapper: HTMLDivElement;
    return {
        onStart(props: SuggestionProps) {
            const { editor } = props;
            const virtualElement: VirtualElement = {
                getBoundingClientRect() {
                    return props.clientRect?.() as ClientRectObject;
                }
            };
            wrapper = document.createElement('div');
            editor.view.dom.parentNode?.appendChild(wrapper);
            component = new HashTagsComponent({
                target: wrapper,
                props: { props }
            });
            Object.assign(wrapper.style, {
                position: 'absolute',
                zIndex: 1,
                opacity: 0,
                transition: 'opacity 0.2s ease-in-out'
            });

            computePosition(virtualElement, wrapper, {
                placement: 'bottom-start'
            }).then(({ x, y }) => {
                Object.assign(wrapper.style, {
                    top: `${y}px`,
                    left: `${x}px`
                });
                requestAnimationFrame(() => {
                    Object.assign(wrapper.style, {
                        opacity: 1
                    });
                });
            });
        },

        onUpdate(props: SuggestionProps) {
            component?.$set({ props });
        },

        onExit() {
            component?.$destroy();
            wrapper?.remove();
        },

        onKeyDown(props: SuggestionKeyDownProps) {
            if (props.event.key === 'Escape') {
                return true;
            }
            return component?.onKeyDown(props);
        }
    };
};