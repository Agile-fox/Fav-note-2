import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';
import PageContext from 'context';

class MainTemplate extends Component {
  state = {
    pageContext: 'notes',
  };

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = ['twitters', 'articles', 'notes'];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));

    if (prevState.pageContext !== currentPage) {
      this.setState({ pageContext: currentPage });
    }
  };

  render() {
    const { children } = this.props;
    const { pageContext } = this.state;

    return (
      <div>
        <PageContext.Provider value={pageContext}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
