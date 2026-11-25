import BorderedContainer from "../components/BorderedContainer";
import NavigateLink from "../components/NavigateLink";
import { BASE_PATH } from "../config";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-y-6 py-6">
      <img
        src={`${BASE_PATH}favicon.svg`}
        alt="iOSDC Japan 2024"
        className="w-24 h-24"
      />
      <div className="text-center">
        <div className="font-bold text-transparent bg-clip-text bg-iosdc-japan flex flex-col gap-y-2">
          <div className="text-3xl">iOSDC Japan 2024</div>
          <div className="text-6xl">Swift Code Battle</div>
        </div>
      </div>
      <div className="mx-2">
        <BorderedContainer>
          <p className="text-gray-900 max-w-prose">
            Swift コードバトルは指示された動作をする Swift
            コードをより短く書けた方が勝ち、という 1 対 1
            の対戦コンテンツです。8/22（木）day0 前夜祭では 8/12
            に実施された予選を勝ち抜いたプレイヤーによるトーナメント形式での
            Swift
            コードバトルを実施します。ここでは短いコードが正義です！可読性も保守性も放り投げた、イベントならではのコードをお楽しみください！
          </p>
          <div className="mt-4 pt-4 border-t border-gray-300 max-w-prose">
            <p className="font-bold text-gray-900">追記</p>
            <p className="mt-2 text-gray-900">
              イベントは終了しました。ご参加いただいたみなさま、ありがとうございました！
              出題された問題と、各プレイヤーが試合中に提出した中で最もスコアの良いコードは、試合一覧からご覧いただけます。
              試合結果の振り返りはスタッフブログで公開しています。
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <NavigateLink to="dashboard/">試合一覧</NavigateLink>
              <NavigateLink to="https://blog.iosdc.jp/2024/08/30/iosdc-japan-2024-swift-code-battle/">
                スタッフブログ
              </NavigateLink>
            </div>
          </div>
        </BorderedContainer>
      </div>
    </div>
  );
}
