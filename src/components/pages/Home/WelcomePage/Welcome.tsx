import React from "react";
import classes from "./Welcome.module.scss"

const Welcome: React.FC = () => {
  return (
    <section className={classes.welcome}>
      <div className={`container`}>
        <div className={classes.welcome__content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis
          atque molestiae, architecto libero iure nulla aliquam, illo rem
          dolorum iusto aut. Pariatur id nam sequi laudantium praesentium, quasi
          odit! Eaque facilis earum aut error quas est, dignissimos rerum, rem,
          non dolor recusandae vitae eos voluptatibus quia necessitatibus ex
          repudiandae voluptates! Qui sunt quidem aut eum laudantium neque
          commodi eaque culpa quod alias odit cum dolor soluta dolorum enim,
          dicta aperiam saepe! Labore, accusamus inventore ipsam modi officiis
          dolorem perferendis temporibus placeat vero unde quisquam doloribus
          sunt necessitatibus corporis eligendi eaque. Corrupti natus quidem
          rerum totam tenetur eos ab velit dolore et in laboriosam qui magnam
          aliquam, itaque aut possimus optio aliquid repudiandae minima, officia
          distinctio assumenda!
        </div>
      </div>
    </section>
  );
};

export default Welcome;
