import QRCodeP from "qrcode";
import { useState } from "react";
import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { until } from "../../helpers/until";

const QrCode = () => {
	const [qrCode, setQrCode] = useState("false");
	const location = useLocation();

	const parkingLotId = new URLSearchParams(location.search).get("parkingLotId");

	const generateQRcode = async () => {
		try {
			const [err, response] = await until(
				QRCodeP.toDataURL(`localhost:3000/parking/${parkingLotId}/history`)
			);
			if (err) return console.log(err);
			if (!response) return console.log("no response");
			setQrCode(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		generateQRcode();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Paper elevation={3}>
			<img src={qrCode} alt="qrCode" style={{ width: "100%" }} />
		</Paper>
	);
};

export default QrCode;
