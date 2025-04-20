import {
    ShaderMaterial,
    UniformsLib,
    Color,
    Vector2,
    type Texture,
    type ShaderMaterialParameters,
    type IUniform,
} from 'three';
import { vertexShader, fragmentShader } from './shaders';

interface MeshLineMaterialParameters {
    fogColor?: Color;
    fogDensity?: number;
    fogNear?: number;
    fogFar?: number;
    lineWidth?: number;
    map?: Texture | null;
    useMap?: boolean;
    alphaMap?: Texture | null;
    useAlphaMap?: boolean;
    color?: Color;
    opacity?: number;
    resolution?: Vector2;
    sizeAttenuation?: boolean;
    dashArray?: number;
    dashOffset?: number;
    dashRatio?: number;
    useDash?: boolean;
    visibility?: number;
    alphaTest?: number;
    repeat?: Vector2;
};

type MeshLineMaterialUniform = MeshLineMaterialParameters extends infer T ? {
    [Key in keyof T]-?: IUniform<Exclude<T[Key], undefined>>;
} : never;

export class MeshLineMaterial extends ShaderMaterial {
    readonly isMeshLineMaterial = true;
    override readonly type = 'MeshLineMaterial';

    declare uniforms: MeshLineMaterialUniform;

    get fogColor() {
        return this.uniforms.fogColor.value;
    }

    set fogColor(value) {
        this.uniforms.fogColor.value = value;
    }

    get fogDensity() {
        return this.uniforms.fogDensity.value;
    }

    set fogDensity(value) {
        this.uniforms.fogDensity.value = value;
    }

    get fogNear() {
        return this.uniforms.fogNear.value;
    }

    set fogNear(value) {
        this.uniforms.fogNear.value = value;
    }

    get fogFar() {
        return this.uniforms.fogFar.value;
    }

    set fogFar(value) {
        this.uniforms.fogFar.value = value;
    }

    get lineWidth() {
        return this.uniforms.lineWidth.value;
    }

    set lineWidth(value) {
        this.uniforms.lineWidth.value = value;
    }

    get map() {
        return this.uniforms.map.value;
    }

    set map(value) {
        this.uniforms.map.value = value;
    }

    get useMap() {
        return this.uniforms.useMap.value;
    }

    set useMap(value) {
        this.uniforms.useMap.value = value;
    }

    get alphaMap() {
        return this.uniforms.alphaMap.value;
    }

    set alphaMap(value) {
        this.uniforms.alphaMap.value = value;
    }

    get useAlphaMap() {
        return this.uniforms.useAlphaMap.value;
    }

    set useAlphaMap(value) {
        this.uniforms.useAlphaMap.value = value;
    }

    get color() {
        return this.uniforms.color.value;
    }

    set color(value) {
        this.uniforms.color.value = value;
    }

    get resolution() {
        return this.uniforms.resolution.value;
    }

    set resolution(value) {
        this.uniforms.resolution.value.copy(value);
    }

    get sizeAttenuation() {
        return this.uniforms.sizeAttenuation.value;
    }

    set sizeAttenuation(value) {
        this.uniforms.sizeAttenuation.value = value;
    }

    get dashArray() {
        return this.uniforms.dashArray.value;
    }

    set dashArray(value) {
        this.uniforms.dashArray.value = value;
        this.useDash = value === 0 ? false : true;
    }

    get dashOffset() {
        return this.uniforms.dashOffset.value;
    }

    set dashOffset(value) {
        this.uniforms.dashOffset.value = value;
    }

    get dashRatio() {
        return this.uniforms.dashRatio.value;
    }

    set dashRatio(value) {
        this.uniforms.dashRatio.value = value;
    }

    get useDash() {
        return this.uniforms.useDash.value;
    }

    set useDash(value) {
        this.uniforms.useDash.value = value;
    }

    get visibility() {
        return this.uniforms.visibility.value;
    }

    set visibility(value) {
        this.uniforms.visibility.value = value;
    }

    get alphaTest() {
        return this.uniforms.alphaTest.value;
    }

    set alphaTest(value) {
        this.uniforms.alphaTest.value = value;
    }

    get repeat() {
        return this.uniforms.repeat.value;
    }

    set repeat(value) {
        this.uniforms.repeat.value.copy(value);
    }

    constructor(parameters?: ShaderMaterialParameters & MeshLineMaterialParameters) {
        super({
            uniforms: {
                ...UniformsLib.fog,
                lineWidth: { value: 1 },
                map: { value: null },
                useMap: { value: false },
                alphaMap: { value: null },
                useAlphaMap: { value: false },
                color: { value: new Color(0xFF_FF_FF) },
                opacity: { value: 1 },
                resolution: { value: new Vector2(1, 1) },
                sizeAttenuation: { value: true },
                dashArray: { value: 0 },
                dashOffset: { value: 0 },
                dashRatio: { value: 0.5 },
                useDash: { value: false },
                visibility: { value: 1 },
                alphaTest: { value: 0 },
                repeat: { value: new Vector2(1, 1) },
            } satisfies MeshLineMaterialUniform,
            vertexShader,
            fragmentShader,
        });

        Object.defineProperty(this, 'opacity', {
            enumerable: true,
            get(this: MeshLineMaterial) {
                return this.uniforms.opacity.value;
            },
            set(this: MeshLineMaterial, v: number) {
                this.uniforms.opacity.value = v;
            },
        });

        this.setValues(parameters ?? {});
    }

    override copy(source: MeshLineMaterial) {
        super.copy(this);

        this.fogColor = source.fogColor;
        this.fogDensity = source.fogDensity;
        this.fogNear = source.fogNear;
        this.fogFar = source.fogFar;

        this.lineWidth = source.lineWidth;
        this.map = source.map;
        this.useMap = source.useMap;
        this.alphaMap = source.alphaMap;
        this.useAlphaMap = source.useAlphaMap;
        this.color.copy(source.color);
        this.opacity = source.opacity;
        this.resolution.copy(source.resolution);
        this.sizeAttenuation = source.sizeAttenuation;
        this.dashArray = source.dashArray;
        this.dashOffset = source.dashOffset;
        this.dashRatio = source.dashRatio;
        this.useDash = source.useDash;
        this.visibility = source.visibility;
        this.alphaTest = source.alphaTest;
        this.repeat.copy(source.repeat);

        return this;
    }
}
