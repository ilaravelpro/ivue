/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 7/29/20, 5:38 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import { AbilityBuilder } from '@casl/ability'

/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */


function subjectName(item) {
    if (typeof item === 'string') {
        return item
    }

    return 'all'
}
export default function defineRulesFor({ subjectName },) {

}
