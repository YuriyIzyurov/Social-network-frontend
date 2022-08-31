import React, {useState} from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {CopyOutlined} from "@ant-design/icons";
import classnames from 'classnames';

export const CopyToClipBoardData = ({name, data}:{name:string, data:string}) => {

    const [copiedFirst, setCopiedFirst] = useState<boolean>(false)
    const handleCopyFirst = () => {
        setCopiedFirst(true)
        setTimeout(() =>{
            setCopiedFirst(false)
        }, 400)
    }

    return (
        <div className="authInfo-data">
                <span style={{ paddingRight: '5px'}}>
                    {name}:
                </span>
            <span>{data}</span>
            <CopyToClipboard text={data}
                             onCopy={handleCopyFirst}>
                    <span style={{position:'relative'}}>
                       <CopyOutlined/>
                        <span className={classnames('descr',{  "description-copy" : !copiedFirst})}>Copy</span>
                         <span className={classnames('popup-descr',{  "description-copied" : copiedFirst})}>Copied!</span>
                    </span>
            </CopyToClipboard>
        </div>
    );
};
