import Link from 'next/link';
import { HandsomeComponent } from 'common/exports_data';
import Card from 'content/card';
import styles from './index.module.scss';

export default function ScrollShow({
  components_data = []
}: {
  components_data: HandsomeComponent[];
}) {
  return (
    <div className={styles.background}>
      <div className={styles.app}>
        <div className={styles.tag__list}>
          {components_data.map(
            (component, index) =>
              index < 3 && (
                <section key={component.index} className={styles.loop__slider}>
                  <div className={styles.inner}>
                    {component.children.map(
                      (e, index) =>
                        index < 7 && (
                          <div className={styles.tag} key={index}>
                            <Card
                              post={e}
                              style={{ height: 200 }}
                              showName={false}
                            />
                          </div>
                        )
                    )}
                    {component.children.map(
                      (e, index) =>
                        index < 7 && (
                          <div className={styles.tag} key={'2' + index}>
                            <Card
                              post={e}
                              style={{ height: 200 }}
                              showName={false}
                            />
                          </div>
                        )
                    )}
                  </div>
                </section>
              )
          )}
        </div>
      </div>
      <div className={styles.fade}></div>
      <Link className={styles.show__all_link} href="/show-all">
        Show ALL !
      </Link>
    </div>
  );
}
