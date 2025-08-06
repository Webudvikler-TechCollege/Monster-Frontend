/**
 * Udskriver sidetitel, descriptiob og
 * h1 og h2 overskrifter på sider
 * @param {*} props
 * @returns
 */
import { Helmet } from "react-helmet-async";

export const ContentWrapper = ({ title, subtitle, description, hidetitle, children }) => {
    return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && (
          <meta name="description" content={description} />
        )}
      </Helmet>

      <section>
        <div>
          {!hidetitle && (
            <h1 className="text-3xl">{title}</h1>
          )}
          {subtitle && <h3>{subtitle}</h3>}
        </div>
        <div>{children}</div>
        </section>
    </>
  )
}
