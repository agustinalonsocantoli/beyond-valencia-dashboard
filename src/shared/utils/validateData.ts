import { ExperiencesInt } from "../../interfaces/ExperiencesInt";
import { MultimediaInt } from "../../interfaces/MultimediaInt";
import { ProductInt } from "../../interfaces/ProductInt";

export const validateNewExperience = (experience: ExperiencesInt): boolean => {
    if(
        experience?.published &&
        (experience?.multimedia?.length == 4) &&
        experience?.title &&
        experience?.subtitle?.label &&
        experience?.subtitle?.text &&
        experience?.headline &&
        experience?.information &&
        experience?.details?.age &&
        experience?.details?.duration &&
        experience?.details?.meetengPoint.label &&
        experience?.details?.language &&
        experience?.details?.ticket &&
        experience?.details?.mobility &&
        experience?.details?.accessibility &&
        experience?.details?.availably &&
        (experience?.groups?.length > 0) &&
        experience?.description &&
        experience?.conditions
    ) {
        return true
    } else {
        return false
    }
}

export const validateNewProducts = (product: ProductInt): boolean => {
    if(
        product?.title &&
        product?.description &&
        product?.type &&
        product?.price?.small &&
        product?.price?.medium
    ) {
        return true
    } else {
        return false
    }
}

export const checkImage = (multimedia: MultimediaInt[]) => {
    let isEmpty = false;
    let index = 0;

    while(multimedia?.length > index) {
        if(multimedia[index].src === "") {
            isEmpty = true;
        } 

        index++
    }

    return isEmpty;
}