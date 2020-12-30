import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/bootstrap.min.css";
import store from "../store";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import RedirectWrapper from "../components/RedirectWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SEO />
      <RedirectWrapper>
        <Header />
        <main>
          <Container>
            <Component {...pageProps} />
          </Container>
        </main>
        <Footer />
      </RedirectWrapper>
    </Provider>
  );
}

export default MyApp;
