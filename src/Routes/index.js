import React, { memo } from 'react';
import CONFIG from 'configs/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InitGame from 'pages/InitGame';
import Game from 'pages/Game';
import Result from 'pages/Result';

const Routes = memo(() => {
  const { ROUTES } = CONFIG;

  return (
    <Router>
      <Route path={ROUTES.RESULT} exact>
        <Result />
      </Route>
      <Route path={ROUTES.GAME} exact>
        <Game />
      </Route>
      <Route path={ROUTES.MAIN} exact>
        <InitGame />
      </Route>
    </Router>
  );
});

Routes.displayName = 'Routes';

export default Routes;
