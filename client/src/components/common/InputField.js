import { Col, Row } from "antd";

const InputField = ({label , lcol , icol, placeholder, ...inputProps }) => {
    return (
        <>
            
                <Col span={lcol? lcol : 4} className="mb-3">
                    <label className="block font-semibold mt-5 text-right mr-10">{label}</label>
                </Col>
                <Col span={icol ? icol : 8} className="mb-3">
                    <input {...inputProps} placeholder={placeholder? placeholder : label} className="w-full py-2 px-2 mt-2 border-2"/>
                </Col>
            
            
        </>
    )
}

export default InputField;