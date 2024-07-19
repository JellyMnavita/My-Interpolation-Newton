<?php
header('Access-Control-Allow-Origin:*');
header('Content-type:application/json');

$retour = [];
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $x = explode(',',$_POST['x']);
    $fx = explode(',',$_POST['fx']);

    if ($_POST['typeOP'] == "polynome") {
        $polynome = showPolynome($x, $fx);
        $retour['etat'] = "success";
        $retour['polynome'] = $polynome;
    } else {
        $xi = $_POST['xi'];
        $valeur = newton($x, $fx, $xi);
        $retour['etat'] = "success";
        $retour['valeur'] = $valeur;
    }
    echo json_encode($retour);

}
function diffdiv($x, $fx)
{
    $n = count($x);
    $delta = array_fill(0, $n, array_fill(0, $n, 0));

    for ($i = 0; $i < $n; $i++) {
        $delta[$i][0] = $fx[$i];
    }
    for ($j = 1; $j < $n; $j++) {
        for ($i = 0; $i < $n - $j; $i++) {
            $delta[$i][$j] = ($delta[$i + 1][$j - 1] - $delta[$i][$j - 1]) / ($x[$i + $j] - $x[$i]);
        }
    }
    return array_map(function ($a) {
        return $a[0];
    }, $delta);
}
function showPolynome($x, $fx)
{
    $delta = diffdiv($x, $fx);
    $poly = '' . $delta[0];

    for ($i = 1; $i < count($x); $i++) {
        $term = '' . $delta[$i];
        if ($delta[$i] % 1 !== 0) {
            $term = number_format($delta[$i], 2);
        }
        for ($j = 0; $j < $i; $j++) {
            $term .= '(x-' . $x[$j] . ')';
        }
        $poly .= '+' . $term;
    }
    return $poly;
}
function newton($x, $fx, $xi)
{
    $delta = diffdiv($x, $fx);
    $result = $delta[0];

    for ($i = 1; $i < count($x); $i++) {
        $pol = $delta[$i];
        for ($j = 0; $j < $i; $j++) {
            $pol *= $xi - $x[$j];
        }
        $result += $pol;
    }
    return $result;
}