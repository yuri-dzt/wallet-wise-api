import jwt from "jsonwebtoken";

import { IJwtService, JwtPayloadProps } from "../../contracts/services/jwt";

export class JwtService implements IJwtService {
	sign(payload: JwtPayloadProps): string {
		const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
			expiresIn: "30d",
		});

		return token;
	}

	verify(token: string): JwtPayloadProps {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET || ""
		) as JwtPayloadProps;
		return payload;
	}
}
