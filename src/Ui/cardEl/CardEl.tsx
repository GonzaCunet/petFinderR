import css from "./cardEl.module.css";
import { ButtonEl } from "../../Ui/button/button";

export const CardEl = (props: any) => {
  const { photoURL } = props;
  return (
    <div className={css.root}>
      <div className={css.imgcontainer}>
        <img className={css.img} src={photoURL}></img>
      </div>
      <div className={css.textandbuttoncontainer}>
        <div className={css.textcont}>
          <h1 className={css.cardtitle}>{props.name}</h1>
          <h2 className={css.cardtext}>{props.lastLocation}</h2>
        </div>
        <div className={css.buttoncont}>
          <ButtonEl
            buttonColor={props.buttonColor}
            width="120px"
            height="40px"
            handleClick={props.handleClick}
          >
            {props.children}
          </ButtonEl>
        </div>
      </div>
    </div>
  );
};
