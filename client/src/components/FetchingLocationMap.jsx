import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle, MapPin, Navigation } from "lucide-react";

const FetchingLocationMap = ({ isFetchingLocation }) => {
  if (!isFetchingLocation) return null;
  return (
    <AnimatePresence>
      {isFetchingLocation && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-(--border) bg-[#f5f5f5]"
        >
          {/* GRID */}
          <motion.div
            className="absolute inset-0"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-black/5"
                style={{
                  top: `${i * 10}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute bottom-0 top-0 w-px bg-black/5"
                style={{
                  left: `${i * 10}%`,
                }}
              />
            ))}
          </motion.div>

          {/* ROADS */}
          <motion.div
            animate={{
              x: [-20, 0, -20],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-[-10%] top-[25%] h-6 w-[130%] rotate-[-8deg] bg-white/70 shadow-sm"
          />

          <motion.div
            animate={{
              x: [20, 0, 20],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-[-10%] top-[60%] h-5 w-[130%] rotate-[12deg] bg-white/70 shadow-sm"
          />

          <div className="absolute left-[40%] top-[-10%] h-[130%] w-5 rotate-[8deg] bg-white/70 shadow-sm" />

          {/* BLURS */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl"
          />

          {/* LOCATION PIN */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="relative"
            >
              {/* OUTER RINGS */}
              <motion.div
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-(--primary)"
              />

              <motion.div
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-(--primary)"
              />

              {/* PIN */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-22 w-22 items-center justify-center rounded-full bg-(--primary) text-white shadow-[0_20px_50px_rgba(249,115,22,0.35)]"
              >
                <MapPin size={38} fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>

          {/* TOP POPUP */}
          <motion.div
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="absolute left-1/2 top-8 z-20 w-[90%] max-w-md -translate-x-1/2 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="rounded-2xl bg-orange-100 p-3 text-(--primary)"
              >
                <Navigation size={22} />
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <LoaderCircle
                    size={18}
                    className="animate-spin text-(--primary)"
                  />

                  <p className="font-bold text-(--text-primary)">
                    Detecting your location
                  </p>
                </div>

                <motion.p
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="mt-2 text-sm leading-6 text-(--text-secondary)"
                >
                  Fetching accurate GPS coordinates and preparing nearby
                  restaurants.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM POPUP */}
          <motion.div
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 20,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
            }}
            className="absolute bottom-6 left-1/2 z-20 w-[92%] max-w-lg -translate-x-1/2 rounded-3xl border border-white/40 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-(--text-primary)">
                  Optimizing delivery experience
                </p>

                <p className="mt-1 text-xs text-(--text-secondary)">
                  This may take a few seconds
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay,
                    }}
                    className="h-2 w-2 rounded-full bg-(--primary)"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FetchingLocationMap;
