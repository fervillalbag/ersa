import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<link
						rel='shortcut icon'
						href='/favicon-32x32.png'
						type='image/x-icon'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
