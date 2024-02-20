declare namespace daum {
  export type PostcodeResult = {
    address: string;
    zonecode: string;
    roadAddress: string;
    autoRoadAddress: string;
    jibunAddress: string;
    autoJibunAddress: string;
  };

  export class Postcode {
    constructor({
      oncomplete,
      width,
      height,
    }: {
      oncomplete: (data: PostcodeResult) => void;
      width: string;
      height: string;
    });

    embed(element: HTMLElement | null);
  }
}
