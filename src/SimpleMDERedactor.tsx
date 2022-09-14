import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";


type PropsType = {
    handleSetText: (value: string) => void
    text: string
}
const SimpleMDERedactor: React.FC<PropsType> = ({handleSetText, text}) => {

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст ...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            }
        }) as EasyMDE.Options,
        []
    )

    return (
        <div>
            <SimpleMDE
                className="textarea-MDE"
                value={text}
                onChange={handleSetText}
                options={options}
            />
        </div>
    );
};

export default SimpleMDERedactor;

