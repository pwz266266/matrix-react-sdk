/*
Copyright 2019-2022 The Matrix.org Foundation C.I.C.
Copyright 2022 Šimon Brandner <simon.bra.ag@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useState } from "react";

import { _t } from "../../../languageHandler";
import { copyPlaintext } from "../../../utils/strings";
import { ButtonEvent } from "./AccessibleButton";
import AccessibleTooltipButton from "./AccessibleTooltipButton";

interface IProps {
    children: React.ReactNode;
    getTextToCopy: () => string;
}

const CopyableText: React.FC<IProps> = ({ children, getTextToCopy }) => {
    const [tooltip, setTooltip] = useState<string | undefined>(undefined);

    const onCopyClickInternal = async (e: ButtonEvent) => {
        e.preventDefault();
        const successful = await copyPlaintext(getTextToCopy());
        setTooltip(successful ? _t('Copied!') : _t('Failed to copy'));
    };

    const onHideTooltip = () => {
        if (tooltip) {
            setTooltip(undefined);
        }
    };

    return <div className="mx_CopyableText">
        <div className="mx_CopyableText_innerText">{ children }</div>
        <AccessibleTooltipButton
            title={tooltip ?? _t("Copy")}
            onClick={onCopyClickInternal}
            className="mx_CopyableText_copyButton"
            onHideTooltip={onHideTooltip}
        />
    </div>;
};

export default CopyableText;