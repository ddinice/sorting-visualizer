'use client';

import {SortingAlgorithmType} from "@/lib/types";
import {MAX_ANIMATION_SPEED, generateRandomNumberFromInterval} from "@/lib/utils";
import {AnimationArrayType} from "@/lib/types";
import {createContext, useContext, useEffect, useState} from "react";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  isSorting: boolean,
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animation: AnimationArrayType) => void;
  requiresReset: boolean;
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgorithmProvider = ({children}: {children: React.ReactNode}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

  const requiresReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation();
    // regenerate array on resize window width
    window.addEventListener('resize',resetArrayAndAnimation);
    // cleanup
    return () => {
      window.removeEventListener('resize', resetArrayAndAnimation);
    }
  }, [])

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if(!contentContainer) return;

    const contentContainerWith = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWith / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++){
      tempArray.push(generateRandomNumberFromInterval(100, maxLineHeight))
    }
    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);
    const inverseSpeed = (1/animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      })
    };

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined,
    ) => {
      if (newHeight === undefined) return;
      arrayLines[lineIndex].style.height = `${newHeight}px`
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", "default-line-color");
          setTimeout(() => {
            updateClassList(values, "default-line-color", "change-line-color");
          }, inverseSpeed)
        } else {
          const [lineIndex, newHeight] = value;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    })
  };

  const value = {
    arrayToSort, 
    setArrayToSort,
    selectedAlgorithm, 
    setSelectedAlgorithm,
    isSorting, 
    setIsSorting,
    animationSpeed, 
    setAnimationSpeed,
    isAnimationComplete, 
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext)
  if(!context) {
    throw new Error('useSortingAlgorithmContext must be used a useSortingAlgorithmProvider')
  }
  return context
}