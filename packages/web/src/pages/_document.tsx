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
					<link
						href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
						rel='stylesheet'
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
