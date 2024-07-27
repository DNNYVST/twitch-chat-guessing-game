import { MouseEventHandler } from "react";
import { useTransition, animated, config } from "@react-spring/web";
import { Winner } from "./leaderboard";
import { Card } from "./core/styled/card";
import { Button } from "./core/styled/button";

const WinnerModal = ({
  winner,
  onClickReplay,
}: {
  winner: Winner;
  onClickReplay: MouseEventHandler<HTMLButtonElement>;
}) => {
  const transitions = useTransition(Object.keys(winner).length > 0, {
    from: {
      opacity: 0,
      transform: `scale(${0.5})`,
      transformOrigin: "center",
    },
    enter: { opacity: 1, transform: `scale(${1})` },
    leave: { opacity: 0, transform: `scale(${0.5})` },
    config: config.wobbly,
  });

  return (
    <div className="flex w-[100vw] h-[100vh] top-0 left-0 absolute bg-[#0E0E10] bg-opacity-60">
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="w-1/4 m-auto rounded-md shadow-2xl"
            >
              <Card title="Winner!">
                <div className="text-center">
                  <h2
                    className="mb-3 text-2xl font-semibold"
                    style={{ color: `${winner.color}` }}
                  >
                    {winner.name}
                  </h2>
                  <div className="space-x-4">
                    <Button
                      aria-label="Replay same word"
                      onClick={onClickReplay}
                    >
                      Replay same word
                    </Button>
                    <Button
                      aria-label="New secret word"
                      onClick={() => {
                        /* TODO */
                      }}
                      variant="secondary"
                    >
                      New secret word
                    </Button>
                  </div>
                </div>
              </Card>
            </animated.div>
          )
      )}
    </div>
  );
};

export default WinnerModal;
