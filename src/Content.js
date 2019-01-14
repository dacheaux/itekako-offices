import React from "react";

const chunk = (a, l) => {
  if (a.length === 0) return [];
  return [a.slice(0, l)].concat(chunk(a.slice(l), l));
};

export default ({ offices, view }) => {
  const descriptionStyle = {
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical"
  };
  if (!offices.length) return <div className="loader" />;
  return (
    <div className="holder">
      {offices.map(o => {
        const photo = o.photo ? <img src={o.photo} alt="" /> : "";
        return (
          <article className="block-item" key={o.id}>
            <div className="photo">
              {photo}
              <span>{o.name[0]}</span>
            </div>
            <div className="entry">
              <h3>{o.name}</h3>
              <p style={descriptionStyle}>{o.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};
