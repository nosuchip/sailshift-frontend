import Vue from 'vue';

export interface Dictionary<V = any> {
    [key: string]: V;
}

export interface ValidatableElement extends Vue {
    resetValidation: () => void;
    validate: () => boolean;
}
