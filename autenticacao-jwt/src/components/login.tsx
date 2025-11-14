import {
	Button,
	Paper,
	PasswordInput,
	TextInput,
	Title,
	Notification,
} from "@mantine/core";
import { useState } from "react";
import classes from "./AuthenticationImage.module.css";

export function AuthenticationImage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			const payload = { username, password };
			console.log("Enviando:", payload);

			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify(payload),
			});

			console.log("Status:", response.status);
			const data = await response.json();
			console.log("Resposta:", data);

			if (response.ok) {
				sessionStorage.setItem("token", data.token);
				setSuccess("Login realizado com sucesso!");
			} else {
				setError(data.message || "Erro no login");
			}
		} catch (err) {
			console.error("Erro:", err);
			setError("Erro de conexão com a API");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form}>
				<Title order={2} className={classes.title}>
					Login JWT
				</Title>

				{error && (
					<Notification color="red" mb="md">
						{error}
					</Notification>
				)}

				{success && (
					<Notification color="green" mb="md">
						{success}
					</Notification>
				)}

				<form onSubmit={handleLogin}>
					<TextInput
						label="Usuário"
						placeholder="admin ou usuario"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						size="md"
						radius="md"
						required
					/>
					<PasswordInput
						label="Senha"
						placeholder="123456 ou senha123"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						mt="md"
						size="md"
						radius="md"
						required
					/>
					<Button
						type="submit"
						fullWidth
						mt="xl"
						size="md"
						radius="md"
						loading={loading}
					>
						Login
					</Button>
				</form>
			</Paper>
		</div>
	);
}